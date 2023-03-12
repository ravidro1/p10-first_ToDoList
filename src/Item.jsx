import { ListItem, Checkbox, IconButton, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';// import CloseIcon from '@mui/material/Icon/Icon';



function Item({ oneItem, completed, index, remove }) {
    function checkBoxClick(){
        completed(index);
    }

    function removeButtonClick(){
        remove(index);
    }

    return (
        <ListItem style={{margin: "1vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Checkbox checked={oneItem.completed} onClick={checkBoxClick} />
            <Typography variant='body1' style={{ textDecoration: oneItem.completed ? "line-through" : null}}>
                {oneItem.task} </Typography>
            <IconButton onClick={removeButtonClick}> <DeleteIcon/> </IconButton>
        </ListItem >
    );
}

export default Item;