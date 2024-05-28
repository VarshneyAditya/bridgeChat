import React, { useState, useEffect } from 'react';

import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({
    color: theme.palette.background.default,
  }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const StyledDropdown = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: HEADER_MOBILE,
  left: 0,
  width: '100%',
  zIndex: 100,
  maxHeight: 300,
  overflowY: 'auto',
  [theme.breakpoints.up('md')]: {
    top: HEADER_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [elasticSearch, setElasticSearch] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuery('');
    setFilteredData([]);
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      console.log(' I am here');
      try {
        const response = await axios.get('http://localhost:3000/api/search');
        const dummy = response.data.hits.hits.map(hit => ({
          category: hit._source.category,
          data: hit._source.data,
          meta: hit._source.meta
      }));
      setElasticSearch(dummy);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSearchData();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if (value) {
      const filtered = elasticSearch.filter(item =>
        item.data.toLowerCase().includes(value) || item.category.toLowerCase().includes(value)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <Typography key={index} component="span" variant="subtitle1" color="primary">
          {part}
        </Typography>
      ) : (
        part
      )
    );
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              value={query}
              onChange={handleInputChange}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />

            {filteredData.length > 0 && (
              <StyledDropdown>
                <List>
                  {filteredData.map((item, index) => (
                    <ListItem key={index} button>
                      <ListItemText
                        primary={highlightText(item.data, query)}
                        secondary={highlightText(item.category, query)}
                      />
                    </ListItem>
                  ))}
                </List>
              </StyledDropdown>
            )}
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
