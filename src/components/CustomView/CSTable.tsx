import React, { FC, ReactElement, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";

import "./CSTable.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Pagination } from "@mui/material";
import { SchemaAttribute } from "../../utils/schemaUtils";


interface GridItem {
  [key: string]: any[]; // Allow for dynamic Data
}

type Props = {
  headerData: SchemaAttribute[];
  bodyData: GridItem[];
  handleSort: (sortByAsc: boolean, key: string) => void;
};

const itemsPerPage = 5;
const CSTable: FC<Props> = ({
  headerData,
  bodyData,
  handleSort,
}): ReactElement => {
  const [sortByAsc, setSortByAsc] = useState(true);
  const [page, setPage] = useState<number>(1);

  const fetchPageData = (currentPage: number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (bodyData && bodyData.length)
      return bodyData.slice(startIndex, endIndex);
    else return bodyData;
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const generateRandomId = () => Math.random().toString(36).substring(7);

  return (
    <div style={{  width: "100%" }}>
      <DataGrid
        rows={fetchPageData(page)}
        columns={
          headerData &&
          headerData
            .filter((item: SchemaAttribute) => item.gridView)
            .map((item, index) => {
              const column: GridColDef = {
                field: item.key || '',
                headerName: item.name,
                flex: 1,
                sortable: item.sort,
                filterable: item.search,
                headerClassName: "header-cell",
                renderHeader: (params) => (
                  <div>
                    <span>{params.colDef.headerName}</span>
                    {item.sort && (
                      <SortIcon
                        className="sort-icon"
                        onClick={() => {
                          handleSort(sortByAsc, item.key || '');
                          setSortByAsc(!sortByAsc);
                        }}
                      />
                    )}
                    
                  </div>
                ),
              };
              return column;
            })
           
        }
       autoHeight  
        hideFooterPagination={true}
        getRowId={() => generateRandomId()}
      />
       <Box mt={2}>
          <Pagination
            count={Math.ceil(bodyData.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
    </div>
  );
};


export default CSTable;
