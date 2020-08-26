import React, { FC } from "react";
import { Table, TableCell, TableContainer, TableHead as Head, TableRow } from "@material-ui/core";

export const TableWrapper: FC = ({ children }) => (
  <TableContainer>
    <Table stickyHeader aria-label="sticky table">
      {children}
    </Table>
  </TableContainer>
);

type TableHeadProps = {
  columns: string[];
};

export const TableHead: FC<TableHeadProps> = ({ columns }) => (
  <Head>
    <TableRow>
      {columns.map((column, key) => (
        <TableCell key={key}>{column}</TableCell>
      ))}
    </TableRow>
  </Head>
);
