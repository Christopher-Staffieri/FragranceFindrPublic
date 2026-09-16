import {
    Avatar,
    Badge,
    Button,
    Checkbox,
    Dropdown,
    Label,
    Pagination,
    Progress,
    Radio,
    Table,
    TextInput,
    theme,
  } from "flowbite-react";
  import { useState } from "react";
  import { HiSearch } from "react-icons/hi";
  import { twMerge } from "tailwind-merge";
  import { EditProposal } from "../forms/EditProposal";



export default function ListTableItem({name, status, onEditClick, data}){

    console.log(status)
    
    return(
        <>
        <Table.Row className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
                    <Table.Cell className="w-4 px-4 py-2">
                        <div className="flex items-center">
                        <Checkbox
                            id="checkbox-table-search-1"
                            name="checkbox-table-search-1"
                        />
                        <Label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                        >
                            Select this project
                        </Label>
                        </div>
                    </Table.Cell>
                    <Table.Cell
                        scope="row"
                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                    >
                        {name}
                    </Table.Cell>
                    
                    
                    </Table.Row>
                    
                    </>
    )
}