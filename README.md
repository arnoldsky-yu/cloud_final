# cloud_final

This is my Practical cloud computing platform final,

docker build -t final-flask-app .

docker run -d -p 5000:5000 final-flask-app

docker build -t final-website .

docker run -d -p 80:80 final-website

# 平台動機：

綜觀目前大學三年經驗，每逢期中、期末或是小考的時候都會遭遇考古題被放在個人資料夾，資料無法流通的狀況，秉持著資訊開源的精神，於是展開了這項計畫，希望能透過一個更加正式、好用的平台，讓考古題不會僅僅停留在私人資料夾，形成「口耳相傳」的模式，而是能有效控管、有對外 IP，能夠讓身邊的同學、夥伴們能更好的檢視過往的考卷，了解課堂出題方向，進而能以最真實的題目檢測自身學習狀況。
而有幸可以使用 Azure 的平台，因此我也希望能在平台以外，測試使用不同的功能，使平台不僅僅只是一個寫死的平台，而是能夠靈活、高可擴充性以及能夠時時檢視平台狀況，進而增加用戶黏著度，使更多人投入這項屬於我們系的經驗傳承旅途。

# User Story

我們透過使用者故事，模擬使用者的運作軌跡，進而能夠更明確的規劃平台。

管理者：管理者可以透過儀表板檢視平台運行狀況，控管考古題的上傳，當考古題被上傳的時候能夠即時收到通知，並加以確認，如果遇到不適合的上傳檔案，可以進行刪除。
學生：學生可以使用平台檢視考古題，當考完試的時候也可以透過平台將考古題上傳

# Final report 
[https://drive.google.com/file/d/1MVNmUv7IXvUy-DcABqzob0K4Pf3AYaNY/view?usp=sharing](https://drive.google.com/file/d/1MVNmUv7IXvUy-DcABqzob0K4Pf3AYaNY/view?usp=sharing)
