import { useState, MouseEvent } from 'react';
import { Autocomplete, Box, Button, Popover, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

interface LgModel {
  key: string;
  name: string;
}

export interface LanguageAddButtonProps<T extends LgModel> {
  languages: T[];
  onAdd: (value: T) => void;
}

export const LanguageAddButton = <T extends LgModel>({
  languages,
  onAdd,
}: LanguageAddButtonProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [addValue, setAddValue] = useState<{ name: string; key: string } | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = () => {
    if (addValue) {
      setAnchorEl(null);
      setAddValue(null);
      onAdd(addValue as T);
    }
  };

  return (
    <Box>
      <Button
        variant="outlined"
        size="small"
        sx={{ minWidth: '30px', maxHeight: '30px', padding: '6px' }}
        onClick={(e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget)}
      >
        <AddIcon fontSize="small" />
      </Button>
      <Popover
        id={anchorEl ? 'mouse-over-popover' : undefined}
        open={!!anchorEl}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Autocomplete
            id="qa-providers"
            sx={{
              width: '220px',
            }}
            options={languages || []}
            value={addValue}
            isOptionEqualToValue={(option, value) => option.key === value.key}
            getOptionLabel={option => option.name}
            onChange={(event, newInputValue) => {
              setAddValue(newInputValue);
            }}
            renderInput={params => (
              <TextField {...params} label="" className="qa-providers" size="small" />
            )}
          />
          <Button
            startIcon={<AddOutlinedIcon />}
            variant="contained"
            size="medium"
            sx={{
              borderRadius: '8px',
            }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
};
