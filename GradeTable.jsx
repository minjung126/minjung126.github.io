import React from "react";

const GradeTable = ({ grades, onUpdateRow, isSaved }) => {
    const totalCredits = grades.reduce(
        (sum, row) => sum + (row.grade !== "F" && row.grade !== "NP" ? Number(row.credit) : 0),
        0
    );
    const totalAttendance = grades.reduce((sum, row) => sum + (row.credit > 1 ? Number(row.attendance) : 0), 0);
    const totalAssignment = grades.reduce((sum, row) => sum + (row.credit > 1 ? Number(row.assignment) : 0), 0);
    const totalMidterm = grades.reduce((sum, row) => sum + (row.credit > 1 ? Number(row.midterm) : 0), 0);
    const totalFinal = grades.reduce((sum, row) => sum + (row.credit > 1 ? Number(row.final) : 0), 0);
    const totalScore = grades.reduce((sum, row) => sum + (row.credit > 1 ? Number(row.total) : 0), 0);

    const validGrades = grades.filter((row) => row.credit > 1);
    const average = validGrades.length > 0 ? (totalScore / validGrades.length).toFixed(2) : 0;

    const calculateOverallGrade = (avg) => {
        if (avg >= 95) return "A+";
        if (avg >= 90) return "A0";
        if (avg >= 85) return "B+";
        if (avg >= 80) return "B0";
        if (avg >= 75) return "C+";
        if (avg >= 70) return "C0";
        if (avg >= 65) return "D+";
        if (avg >= 60) return "D0";
        return "F";
    };

    const overallGrade = calculateOverallGrade(average);

    const handleScoreChange = (id, field, value, min, max) => {
        const validValue = Math.min(Math.max(value, min), max); // 제한 범위 적용
        onUpdateRow(id, field, validValue);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>이수</th>
                    <th>필수</th>
                    <th>과목명</th>
                    <th>학점</th>
                    <th>출석점수</th>
                    <th>과제점수</th>
                    <th>중간고사</th>
                    <th>기말고사</th>
                    <th>총점</th>
                    <th>평균</th>
                    <th>성적</th>
                </tr>
            </thead>
            <tbody>
                {grades.map((row) => (
                    <tr key={row.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={row.selected}
                                onChange={(e) =>
                                    onUpdateRow(row.id, "selected", e.target.checked)
                                }
                            />
                        </td>
                        <td>
                            <select
                                value={row.category}
                                onChange={(e) =>
                                    onUpdateRow(row.id, "category", e.target.value)
                                }
                            >
                                <option value="교양">교양</option>
                                <option value="전공">전공</option>
                            </select>
                        </td>
                        <td>
                            <select
                                value={row.type}
                                onChange={(e) => onUpdateRow(row.id, "type", e.target.value)}
                            >
                                <option value="선택">선택</option>
                                <option value="필수">필수</option>
                            </select>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={row.subject}
                                onChange={(e) =>
                                    onUpdateRow(row.id, "subject", e.target.value)
                                }
                            />
                        </td>
                        <td>
                            {isSaved ? (
                                <span>{row.credit || ""}</span> // 저장 후 학점 표시
                            ) : (
                                <input
                                    type="number"
                                    value={row.credit}
                                    onChange={(e) =>
                                        onUpdateRow(row.id, "credit", e.target.value)
                                    }
                                    min="1"
                                />
                            )}
                        </td>
                        <td>
                            {isSaved ? (
                                <span>{row.attendance || ""}</span> // 저장 후 출석점수 표시
                            ) : row.credit > 1 ? (
                                <input
                                    type="number"
                                    value={row.attendance}
                                    onChange={(e) =>
                                        handleScoreChange(row.id, "attendance", e.target.value, 0, 20)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </td>
                        <td>
                            {isSaved ? (
                                <span>{row.assignment || ""}</span> // 저장 후 과제점수 표시
                            ) : row.credit > 1 ? (
                                <input
                                    type="number"
                                    value={row.assignment}
                                    onChange={(e) =>
                                        handleScoreChange(row.id, "assignment", e.target.value, 0, 20)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </td>
                        <td>
                            {isSaved ? (
                                <span>{row.midterm || ""}</span> // 저장 후 중간고사 점수 표시
                            ) : row.credit > 1 ? (
                                <input
                                    type="number"
                                    value={row.midterm}
                                    onChange={(e) =>
                                        handleScoreChange(row.id, "midterm", e.target.value, 0, 30)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </td>
                        <td>
                            {isSaved ? (
                                <span>{row.final || ""}</span> // 저장 후 기말고사 점수 표시
                            ) : row.credit > 1 ? (
                                <input
                                    type="number"
                                    value={row.final}
                                    onChange={(e) =>
                                        handleScoreChange(row.id, "final", e.target.value, 0, 30)
                                    }
                                />
                            ) : (
                                ""
                            )}
                        </td>
                        <td>{row.credit > 1 ? Math.min(row.total, 100) : ""}</td>
                        <td></td> 
                        <td>
                            {row.credit === 1 && isSaved ? (
                                <span>{row.grade}</span> // 저장 후 최종 결과
                            ) : row.credit === 1 ? (
                                <select
                                    value={row.grade}
                                    onChange={(e) =>
                                        onUpdateRow(row.id, "grade", e.target.value)
                                    }
                                >
                                    <option value="P">P</option>
                                    <option value="NP">NP</option>
                                </select>
                            ) : row.grade === "F" ? (
                                <span style={{ color: "red" }}>{row.grade}</span> // F학점 빨간색
                            ) : (
                                row.grade
                            )}
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="4">합계</td>
                    <td>{totalCredits}</td>
                    <td>{totalAttendance}</td>
                    <td>{totalAssignment}</td>
                    <td>{totalMidterm}</td>
                    <td>{totalFinal}</td>
                    <td>{totalScore}</td>
                    <td>{average}</td>
                    <td style={{ color: overallGrade === "F" ? "red" : "black" }}>
                        {overallGrade}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default GradeTable;
