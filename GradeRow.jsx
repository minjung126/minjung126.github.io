import React from "react";

const GradeRow = ({ row, onUpdateRow }) => {
    const handleInputChange = (field, value) => {
        // 점수 범위 제한
        let newValue = Number(value);
        if (["attendance", "assignment"].includes(field)) {
            newValue = Math.max(0, Math.min(newValue, 20)); // 0~20 제한
        } else if (["midterm", "final"].includes(field)) {
            newValue = Math.max(0, Math.min(newValue, 30)); // 0~30 제한
        }
        onUpdateRow(row.id, field, newValue);
    };

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={row.selected || false}
                    onChange={(e) => onUpdateRow(row.id, "selected", e.target.checked)}
                />
            </td>
            <td>
                <select
                    value={row.category}
                    onChange={(e) => onUpdateRow(row.id, "category", e.target.value)}
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
                    onChange={(e) => onUpdateRow(row.id, "subject", e.target.value)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={row.credit}
                    min="1" // 학점 최소값 제한
                    onChange={(e) => onUpdateRow(row.id, "credit", Number(e.target.value))}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={row.attendance}
                    onChange={(e) => handleInputChange("attendance", e.target.value)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={row.assignment}
                    onChange={(e) => handleInputChange("assignment", e.target.value)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={row.midterm}
                    onChange={(e) => handleInputChange("midterm", e.target.value)}
                />
            </td>
            <td>
                <input
                    type="number"
                    value={row.final}
                    onChange={(e) => handleInputChange("final", e.target.value)}
                />
            </td>
            <td>{row.total}</td>
            <td></td>
            <td style={{ color: row.grade === "F" ? "red" : "black" }}>{row.grade}</td>
        </tr>
    );
};

export default GradeRow;
