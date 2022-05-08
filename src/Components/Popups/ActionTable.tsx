import React from "react";
import { Table } from "../Table";

export const ActionTable: React.FC<{
  data: {
    actionData: {
      actionTaken: string;
      actionStarted: string;
      employee: { _id: string; name: string };
      _id: string;
    }[];
    companyName: string;
    callId: number;
    problemType: string;
  };
}> = ({ data }) => {
  const headers = ["Action Seq.", "Date & Time", "Actor", "Action"];
  return (
    <div className="min-wd-65r dfc-ac-jc p-a-14">
      <span>{data.companyName + " | " + data.callId}</span>
      <hr className="hr wd-100p m-t-8 m-b-8" />
      <span>{data.problemType}</span>
      <Table
        headers={headers}
        pagination={false}
        data={data.actionData.map((cell, index) => [
          <span>{index}</span>,
          <span>{new Date(+cell.actionStarted).toLocaleString("en-gb")}</span>,
          <span>{cell.employee.name}</span>,
          <span>{cell.actionTaken}</span>,
        ])}
      />
    </div>
  );
};
