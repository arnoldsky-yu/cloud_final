from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from azure.storage.blob import BlobServiceClient
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

sas_url = "https://112finalstorage.blob.core.windows.net/exam-files?sp=racwdl&st=2024-01-04T13:37:00Z&se=2024-01-12T21:37:00Z&sv=2022-11-02&sr=c&sig=e2NbDI32WavtrKIpbM0cEiGlNOnfw6Lg6dfTJOaAFHY%3D"
container_name = "exam-files"
blob_service_client = BlobServiceClient(account_url=sas_url)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  

@app.route('/upload', methods=['POST'])
def upload_exam():
    uploaded_file = request.files['uploadFile']
    year = request.form['schoolYear']
    semester = request.form['semester']
    course = request.form['courseName'].replace(' ', '_')

    if uploaded_file:
        original_filename = secure_filename(uploaded_file.filename)
        _, file_extension = os.path.splitext(original_filename)
        filename = f"{year}_{semester}_{course}{file_extension}"

        # 在 Azure Blob Storage 中的 blob 名稱
        blob_name = f"{semester}/{course}/{filename}"
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)

        # 檢查是否存在相同名稱的 blob
        try:
            blob_client.get_blob_properties()

            # 如果存在相同名稱的文件，添加一個遞增的數字
            count = 1
            while True:
                new_blob_name = f"{semester}/{course}/{filename.split('.')[0]}({count}){file_extension}"
                new_blob_client = blob_service_client.get_blob_client(container=container_name, blob=new_blob_name)
                try:
                    new_blob_client.get_blob_properties()
                    count += 1
                except:
                    blob_name = new_blob_name
                    blob_client = new_blob_client
                    break
        except:
            pass

        # 上傳文件到 Blob Storage
        blob_client.upload_blob(uploaded_file)

        return jsonify({'message': '考古題上傳成功', 'path': blob_name})

    return jsonify({'message': '沒有接收到文件'}), 400

@app.route('/exams', methods=['GET'])
def get_exams():
    semester = request.args.get('semester')
    course = request.args.get('course')
    
    if not semester or not course:
        return jsonify({"error": "缺少必要查詢參數"}), 400

    prefix = f"{semester}/{course}/"
    container_client = blob_service_client.get_container_client(container=container_name)
    print("-----------------------------------")
    exams = []
    try:
        container_properties = container_client.get_container_properties()
        print("容器名稱:", container_properties.name)
        print("容器最後修改時間:", container_properties.last_modified)
    except Exception as e:
        print("無法獲取容器屬性，錯誤:", e)
        
    print("-----------------------------------")
    try:
        blobs = container_client.list_blobs()
        for blob in blobs:
            print("Blob 名稱:", blob.name)
    except Exception as e:
        print("無法列出 blobs，錯誤:", e)
    print("-----------------------------------")
    try:
        blob_list = container_client.list_blobs(name_starts_with=prefix)
        for blob in blob_list:
            exams.append({
                "name": blob.name,
                "url": f"{container_client.url}/{blob.name}"
            })
    except Exception as e:
        print(e)
        return jsonify({"error": "無法訪問 Blob 存儲服務"}), 500

    return jsonify(exams)


if __name__ == '__main__':
    app.run(debug=True)
