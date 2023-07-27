import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';



export default function DataTable() {
    const [open, setOpen] = React.useState(false);
    const [modalInfo, setModalInfo] = React.useState([]);
    const [rows, setRows] = React.useState([]);

// ---- API CALLS ------------
    const getPosts = async () => {
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts")
        setRows(data)
    }

    const getComments = async (postId) => {
        const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        setModalInfo(data)
        setOpen(true)
    }

// ------- COLUMNS AND STYLE DEFINITION ------
    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'title', headerName: 'Title', width: 300, cellClassName: "text-left" },
        { field: 'body', headerName: 'Body', width: 500, cellClassName: "text-left" },
        {
          field: 'openComments',
          headerName: 'Comments',
          width: 90,
          renderCell: (params) => <button onClick={() => getComments(params.row.id)}>Open comments</button> 
        },
    ];
    const modalColumns = [
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'body', headerName: 'Comment', width: 300, cellClassName: "text-left" },
    ];

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

// ----- USE EFFECT ------
    React.useState(() => {
        // setModalInfo(comments)
        getPosts()
    },  [])

  return (
    <>
      <div className='h-auto '>
      <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
          pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
        }}
        pageSizeOptions={[5, 10, 15]}
        getRowHeight={() => 'auto'}
        disableSelectionOnClick
        />
        </div>

        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <DataGrid
          className='bg-blue-400'
          columns={modalColumns}
          rows={modalInfo}
          hideFooterPagination={true}
        getRowHeight={() => 'auto'}
        autoHeight 
        disableSelectionOnClick
        checkboxSelection={false}
          />
        </Box>
      </Modal>

        <style>
            {`
            .MuiDataGrid-virtualScroller{ 
                overflow: hidden;
            }
            `}
        </style>
    </>
  );
}