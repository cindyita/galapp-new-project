import { useState,useRef } from 'react';

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";

import { useTranslation } from 'react-i18next';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { FaFileCsv, FaFilePdf, FaGear } from "react-icons/fa6";


function TableComponent({ id_table,table_name, data }) {
    
    const { t } = useTranslation();

    const exportName = `${id_table}_${new Date().toISOString().split("T")[0]}`;

    const theme = useTheme(getTheme());

    const [search, setSearch] = useState('');

    const handleSearch = (event) => setSearch(event.target.value);

    const keys = Object.keys(data.nodes[0] || {});
    const sortFns = {};
    const COLUMNS = keys.map((key) => {
        sortFns[key.toUpperCase()] = (array) =>
        array.sort((a, b) => {
            const valA = a[key];
            const valB = b[key];

            if (typeof valA === "string" && typeof valB === "string") {
                return valA.localeCompare(valB);
            }
            if (typeof valA === "number" && typeof valB === "number") {
                return valA - valB;
            }
            if (valA instanceof Date && valB instanceof Date) {
                return valA.getTime() - valB.getTime();
            }
            return 0;
        });

        return {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        renderCell: (item) =>
            item[key] instanceof Date
            ? item[key].toLocaleDateString()
                    : item[key]?.toString(),
        accessor: (item) => item[key],
        sort: { sortKey: key.toUpperCase() },
        resize:true
        };
    });

    const sort = useSort(data, {}, { sortFns });
    
    //--------------------------------------------
    // DESCARGAR CSV
    const escapeCsvCell = (cell) => {
        if (cell == null) {
        return "";
        }
        const sc = cell.toString().trim();
        if (sc === "" || sc === '""') {
        return sc;
        }
        if (
        sc.includes('"') ||
        sc.includes(",") ||
        sc.includes("\n") ||
        sc.includes("\r")
        ) {
        return '"' + sc.replace(/"/g, '""') + '"';
        }
        return sc;
    };

    const makeCsvData = (columns, data) => {
        return data.reduce((csvString, rowItem) => {
        return (
            csvString +
            columns
            .map(({ accessor }) => escapeCsvCell(accessor(rowItem)))
            .join(",") +
            "\r\n"
        );
        }, columns.map(({ name }) => escapeCsvCell(name)).join(",") + "\r\n");
    };

    const downloadAsCsv = (columns, data, filename) => {
        const csvData = makeCsvData(columns, data);
        const csvFile = new Blob([csvData], { type: "text/csv" });
        const downloadLink = document.createElement("a");

        downloadLink.display = "none";
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const handleDownloadCsv = () => {
        const filename = `${exportName}.csv`;
        downloadAsCsv(COLUMNS, data.nodes, filename);
    };
    //--------------------------------------------
    // DESCARGA PDF
    const printRef = useRef();

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${exportName}.pdf`);
    };
    //--------------------------------------------

    return (
        <>
            <div id={id_table} ref={printRef} className="p-4">
                
                <div className="is-flex mb-2 is-justify-content-space-between is-align-items-center is-gap-1">
                    <div className="is-flex is-align-items-center">
                        <h3>{table_name ?? ''}</h3>
                    </div>
                    <div className="is-flex is-gap-1 is-align-items-center">
                        <div className="is-flex is-gap-1">
                            <button type="button" onClick={handleDownloadCsv} className="button">
                                <FaFileCsv />
                            </button>
                            <button type="button" onClick={handleDownloadPdf} className="button">
                                <FaFilePdf />
                            </button>
                            <button type="button" className="button bg-tertiary border-0">
                                <FaGear />
                            </button>
                        </div>
                        <div>
                            <input className="input" type="text" value={search} onChange={handleSearch}placeholder={t('table.search')+'..'} />
                        </div>
                    </div>
                </div>

                <div>
                    <CompactTable
                        columns={COLUMNS}
                        data={data}
                        sort={sort}
                        theme={theme}
                        layout={{ fixedHeader: true }}
                    />
                </div>
                <br />

            </div>
        </>
    );
}

export default TableComponent;