document.addEventListener('DOMContentLoaded', function() {
    const selectedSemester = sessionStorage.getItem('selectedSemester');
    const selectedCourse = sessionStorage.getItem('selectedCourse');

    if (selectedSemester && selectedCourse) {
        fetch(`/exams?semester=${selectedSemester}&course=${selectedCourse}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('無法獲取考古題');
                }
            })
            .then(exams => {
                const examsContainer = document.getElementById('exams-container');
                // 清空現有內容
                examsContainer.innerHTML = '';
                exams.forEach(exam => {
                    const examLink = document.createElement('a');
                    examLink.href = exam.url;
                    examLink.textContent = exam.name;
                    examLink.target = '_blank'; // 在新標籤頁打開
                    examsContainer.appendChild(examLink);

                    const lineBreak = document.createElement('br');
                    examsContainer.appendChild(lineBreak); // 每個鏈接後添加換行
                });
            })
            .catch(error => {
                console.error('無法加載考古題:', error);
                document.getElementById('exams-container').textContent = error.message;
            });
    } else {
        document.getElementById('exams-container').textContent = '沒有選擇學期或課程';
    }
});
