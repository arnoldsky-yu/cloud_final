
const coursesBySemester = {
    "1-1": ["計算機概論", "線性代數", "微積分", "嵌入式系統"],
    "1-2": ["計算機概論", "離散數學"],
    "2-1": ["計算機概論", "離散數學"],
    "2-2": ["計算機概論", "離散數學"],
    "3-1": ["計算機概論", "離散數學"],
    "3-2": ["計算機概論", "離散數學"],
    "4-1": ["計算機概論", "離散數學"],
    "4-2": ["計算機概論", "離散數學"],
};

function updateCourseOptions() {
    const semesterSelect = document.getElementById('semesterSelect');
    const courseSelect = document.getElementById('courseSelect');
    const selectedSemester = semesterSelect.value;

    while (courseSelect.firstChild) {
        courseSelect.removeChild(courseSelect.firstChild);
    }

    coursesBySemester[selectedSemester].forEach(course => {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    });
}

document.getElementById('semesterSelect').addEventListener('change', updateCourseOptions);

// 初始化課程選項
updateCourseOptions();
