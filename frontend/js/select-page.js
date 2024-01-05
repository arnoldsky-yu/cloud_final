let userSelection = {
    semester: null,
    course: null
};
const courseNameMap = {
    "計算機概論（上）": "IntroComputing1",
    "線性代數": "LinearAlgebra",
    "微積分": "Calculus",
    "嵌入式系統": "EmbeddedSystems",
    "計算機概論（下）": "IntroComputing2",
    "離散數學": "DiscreteMath",
    "工程數學": "EngineeringMath",
    "資料結構": "DataStructures",
    "電路實驗": "CircuitExperiments",
    "電路學": "CircuitTheory",
    "數位邏輯電路設計": "DigitalLogicCircuitDesign",
    "物件導向程式設計": "ObjectOrientedProgramming",
    "計算機組織": "ComputerOrganization",
    "資料結構": "DataStructures",
    "電子學": "Electronics",
    "計算機網路": "ComputerNetworks",
    "機率與統計": "ProbabilityAndStatistics",
    "作業系統": "OperatingSystems",
    "程式語言": "ProgrammingLanguages",
    "演算法分析": "AlgorithmAnalysis",
    "系選修": "DepartmentElectives"
};

document.querySelectorAll('.semester-group').forEach(semesterLink => {
    semesterLink.addEventListener('click', (event) => {
        userSelection.semester = event.currentTarget.dataset.semester;
        sessionStorage.setItem('selectedSemester', userSelection.semester);
    });
});

document.querySelectorAll('.exam-link').forEach(courseLink => {
    courseLink.addEventListener('click', () => {
        const selectedCourseCh = courseLink.dataset.course; 
        const selectedCourse = courseNameMap[selectedCourseCh];
        sessionStorage.setItem('selectedCourse', selectedCourse);
    }); 
});

function fetchExamsFromBlob() {
    const semester = sessionStorage.getItem('selectedSemester');
    const course = sessionStorage.getItem('selectedCourse');

    if (semester && course) {
        fetch(`/exams?semester=${semester}&course=${course}`)
            .then(response => response.json())
            .then(data => {
            })
            .catch(error => {
                console.error('無法加載考古題:', error);
            });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const selectedSemester = sessionStorage.getItem('selectedSemester');
    const selectedCourse = sessionStorage.getItem('selectedCourse');
    const infoParagraph = document.getElementById('selected-semester-course');

    if (selectedSemester && selectedCourse) {
        infoParagraph.textContent = `選擇的學期: ${selectedSemester}, 課程: ${selectedCourse}`;
    } else {
        infoParagraph.textContent = '未選擇學期或課程';
    }
});