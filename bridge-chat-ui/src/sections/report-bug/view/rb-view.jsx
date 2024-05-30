import { useState } from 'react';
import { Buffer } from 'buffer';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Dialog, FormControl, InputLabel, Select, MenuItem, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

import { users } from 'src/_mock/user';
import  { bugs } from 'src/_mock/report-bugs';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function RbDashboardPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);

  const [bugDetails, setBugDetails] = useState({
    title: '',
    description: '',
    assignee: '',
    projectName: '',
    issueType: ''
  });


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: bugs,
    comparator: getComparator(order, orderBy),
    filterName,
  });



  //For Form

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBugDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Submitting bug details:', bugDetails);
    // Reset form fields
    setBugDetails({
      title: '',
      description: '',
      assignee: '',
      projectName: '',
      issueType: ''
    });
    createJiraTicket(bugDetails);
    handleClose();
  };

  const notFound = !dataFiltered.length && !!filterName;

  const createJiraTicket = (bugDetails) => {
    // Map front-end fields to Jira payload
    const jiraPayload = {
      fields: {
        summary: bugDetails.title,
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: bugDetails.description
                }
              ]
            }
          ]
        },
        assignee: {
          accountId: bugDetails.assignee // You need to implement this function to retrieve accountId
        },
        issuetype: {
          name: bugDetails.issueType
        },
        project: {
          key: "KAN"// You need to implement this function to retrieve project key
        }
      }
    };
  
    // Send the payload to Jira API endpoint
  //   fetch('JIRA_API_ENDPOINT', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',    
  //     },
  //     body: JSON.stringify(jiraPayload)
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to create Jira ticket');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log('Jira ticket created successfully:', data);
  //     // Handle success response
  //   })
  //   .catch(error => {
  //     console.error('Error creating Jira ticket:', error);
  //     // Handle error
  //   });
  };

  return (
    <Container  maxWidth="xl"  sx={{ paddingTop: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Reported Issues</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" /> } onClick={handleOpen}>
          Create RB
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Bug Ticket</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={bugDetails.title}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={bugDetails.description}
              onChange={handleChange}
            />
            <FormControl fullWidth >
              <InputLabel>Assignee</InputLabel>
              <Select
                name="assignee"
                value={bugDetails.assignee}
                onChange={handleChange}
              >
                <MenuItem value="712020:94acf1e4-855a-4cf2-a4d1-9181b7cc17f1">Aditya Varshney</MenuItem>
                <MenuItem value="Saransh K">Saransh K</MenuItem>
                <MenuItem value="Abhishek Anand">Abhishek Anand</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Project Name</InputLabel>
              <Select
                name="projectName"
                value={bugDetails.projectName}
                onChange={handleChange}
              >
                <MenuItem value="Kanban Project">Kanban Project</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Issue Type</InputLabel>
              <Select
                name="issueType"
                value={bugDetails.issueType}
                onChange={handleChange}
              >
                <MenuItem value="Task">Task</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={bugs.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'bugID', label: 'Bug ID' },
                  { id: 'title', label: 'Title/Summary' },
                  { id: 'description', label: 'Description' },
                  { id: 'status', label: 'Status' },
                  { id: 'assignedTo', label: 'Assigned To', align: 'center' },
                  { id: 'reporter', label: 'Reporter', align: 'center' },
                  { id: 'creationDate', label: 'Creation Date', align: 'center' },
                  { id: 'lastUpdated', label: 'Last Updated', align: 'center' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.bugId}
                      bugId={row.bugId}
                      title={row.title}
                      description={row.description}
                      status={row.status}
                      assignedTo={row.assignedTo}
                      reporter={row.reporter}
                      creationDate={row.creationDate}
                      lastUpdated = {row.lastUpdated}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, bugs.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={bugs.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
