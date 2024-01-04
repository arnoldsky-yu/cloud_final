const coursesBySemester = {
    "1-1": ["計算機概論（上）", "線性代數", "微積分", "嵌入式系統"],
    "1-2": ["計算機概論（下）", "離散數學"],
    "2-1": ["工程數學", "資料結構", "電路實驗", "電路學", "數位邏輯電路設計"],
    "2-2": ["物件導向程式設計", "計算機組織", "資料結構", "電子學"],
    "3-1": ["計算機網路", "機率與統計"],
    "3-2": ["作業系統", "程式語言", "演算法分析", "機率與統計"],
    "4-1": ["系選修"],
    "4-2": ["無"],
};

function updateCourseOptions() {
    const semesterSelect = document.getElementById('semesterSelect');
    const courseSelect = document.getElementById('courseSelect');
    const schoolYearInput = document.getElementById('schoolYearInput');
    const fileInput = document.querySelector('input[type="file"]');

    const semester = semesterSelect.value;
    const schoolYear = schoolYearInput.value;
    
    while (courseSelect.firstChild) {
        courseSelect.removeChild(courseSelect.firstChild);
    }

    coursesBySemester[semester].forEach(course => {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });

    if (schoolYear && semester) {
        const course = courseSelect.value.replace(/\s+/g, '_');
        fileInput.name = `${schoolYear}_${semester}_${course}`;
    }
}

document.getElementById('semesterSelect').addEventListener('change', updateCourseOptions);
document.getElementById('schoolYearInput').addEventListener('change', updateCourseOptions);

updateCourseOptions();