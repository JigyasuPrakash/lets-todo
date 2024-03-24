import { TableRow, TableCell, Button } from '@mui/material';

function TaskComponent({ task, revertCompletion }) {


    return (
        <TableRow>
            {task.isCompleted ? (
                <>
                    <TableCell style={{textDecoration: "line-through"}}>{task.item}</TableCell>
                    <Button color='secondary' onClick={() => revertCompletion(task._id)}>✔</Button>
                </>
            ) : (
                <>
                    <TableCell>{task.item}</TableCell>
                    <Button color='secondary' onClick={() => revertCompletion(task._id)}>X</Button>
                </>
            )}
        </TableRow>
    )
}

export default TaskComponent;
