import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function About() {
    const [validationErrors, setValidationErrors] = useState< []>([])

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('Validation error test passed'))
            .catch((error) => setValidationErrors(error))
    }
    return (
        <>
            <Container>
                <Typography gutterBottom variant="h2">
                    Error for testing purposes
                </Typography>
                <ButtonGroup>
                    <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch( error => console.log(error))}>Test 400 Error</Button>
                    <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch( error => console.log(error))}>Test 401 Error</Button>
                    <Button variant='contained' onClick={() => agent.TestErrors.get404Error().catch( error => console.log(error))}>Test 404 Error</Button>
                    <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch( error => console.log(error))}>Test 500 Error</Button>
                    <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
                </ButtonGroup>
                {validationErrors.length > 0 && 
                    <Alert severity='error'>
                        <AlertTitle>
                            Validation Errors
                        </AlertTitle>
                        <List>
                            {validationErrors.map((error) => (
                                <ListItem key={error}>
                                    {error}
                                </ListItem>
                            ))}
                        </List>
                    </Alert>
                }
            </Container>
        </>
    )
}