import React, { useState } from "react";
import GradeTable from "./components/GradeTable";
import "./App.css";

const App = () => {
    const initialData = [
        ...Array(4).fill(0).map((_, idx) => ({
            id: `1-${idx + 1}`,
            year: 1,
            category: "교양",
            type: "선택",
            subject: "",
            credit: 1,
            attendance: 0,
            assignment: 0,
            midterm: 0,
            final: 0,
            total: 0,
            grade: "",
            selected: false,
        })),
        ...Array(4).fill(0).map((_, idx) => ({
            id: `2-${idx + 1}`,
            year: 2,
            category: "교양",
            type: "선택",
            subject: "",
            credit: 1,
            attendance: 0,
            assignment: 0,
            midterm: 0,
            final: 0,
            total: 0,
            grade: "",
            selected: false,
        })),
        ...Array(4).fill(0).map((_, idx) => ({
            id: `3-${idx + 1}`,
            year: 3,
            category: "교양",
            type: "선택",
            subject: "",
            credit: 1,
            attendance: 0,
            assignment: 0,
            midterm: 0,
            final: 0,
            total: 0,
            grade: "",
            selected: false,
        })),
    ];

    const [grades, setGrades] = useState(initialData);
    const [year, setYear] = useState(1);
    const [isSaved, setIsSaved] = useState(false); // 저장 상태 추가

    const handleAddRow = () => {
        const newRow = {
            id: `${year}-${Date.now()}`,
            year,
            category: "교양",
            type: "선택",
            subject: "",
            credit: 1,
            attendance: 0,
            assignment: 0,
            midterm: 0,
            final: 0,
            total: 0,
            grade: "",
            selected: false,
        };

        setGrades([...grades, newRow]);
        setIsSaved(false); // 새 행 추가 시 저장 상태 초기화
    };

    const handleDeleteRows = () => {
        setGrades(grades.filter((row) => !row.selected));
        setIsSaved(false); // 삭제 시 저장 상태 초기화
    };

    const handleSave = () => {
        // 동일 과목 중복 검사
        const subjects = grades
            .filter((row) => row.grade !== "F" && row.year === year) // F 학점 제외, 현재 학년만 검사
            .map((row) => row.subject.trim()) // 과목명 앞뒤 공백 제거
            .filter((subject) => subject !== ""); // 빈 과목명 제외
    
        const duplicates = subjects.filter(
            (subject, index, self) => self.indexOf(subject) !== index
        );
    
        if (duplicates.length > 0) {
            alert(`Error: 동일한 과목명이 이미 존재합니다: ${duplicates[0]}`);
            return;
        }
    
        const updatedGrades = grades.map((row) => {
            let total = 0;
            let grade = row.grade;
    
            if (row.credit > 1) {
                total =
                    Number(row.attendance) +
                    Number(row.assignment) +
                    Number(row.midterm) +
                    Number(row.final);
    
                if (total >= 95) grade = "A+";
                else if (total >= 90) grade = "A0";
                else if (total >= 85) grade = "B+";
                else if (total >= 80) grade = "B0";
                else if (total >= 75) grade = "C+";
                else if (total >= 70) grade = "C0";
                else if (total >= 65) grade = "D+";
                else if (total >= 60) grade = "D0";
                else grade = "F";
    
                if (grade === "F") total = 0;
            }
    
            return { ...row, total, grade };
        });
    
        setGrades(updatedGrades);
        setIsSaved(true); // 저장 상태를 true로 설정
    };
    

    const handleUpdateRow = (id, field, value) => {
        const updatedGrades = grades.map((row) =>
            row.id === id ? { ...row, [field]: value } : row
        );
        setGrades(updatedGrades);
        setIsSaved(false); // 수정 시 저장 상태 초기화
    };

    const filteredGrades = grades.filter((row) => row.year === year);

    return (
        <div className="App">
            <h1>Front-end 과제</h1>
            <div className="header">
                <select
                    className="year-select"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                >
                    {[1, 2, 3].map((y) => (
                        <option key={y} value={y}>
                            {y}학년
                        </option>
                    ))}
                </select>
                <div className="controls">
                    <button onClick={handleAddRow}>추가</button>
                    <button onClick={handleDeleteRows}>삭제</button>
                    <button onClick={handleSave}>저장</button>
                </div>
            </div>
            <GradeTable grades={filteredGrades} onUpdateRow={handleUpdateRow} isSaved={isSaved} />
        </div>
    );
};

export default App;
