import {ElNotification} from "element-plus";
import Swal from 'sweetalert2';

export function showSuccess (text)
{
    // Swal.fire({
    //     icon: 'success',
    //     title: 'Success',
    //     text: text,
    //     timer: 4000
    // });
    ElNotification({
        title: 'Success',
        type: "success",
        position: "top-right",
        message: text
    })
}
export function raiseError (text)
{
    ElNotification({
        title: 'Error',
        type: "error",
        position: "top-right",
        message: text
    })
}
export function raiseServerError(err) {
    if (err && err.response && err.response.data) {
        if (err.response.data.errors) {
            // ValidationException
            const errors = err.response.data.errors;
            let errorMessages = [];
            if (Array.isArray(errors)) {
                // errors is an array
                errors.forEach((fieldErrors, index) => {
                    fieldErrors.forEach((message, errorIndex) => {
                        setTimeout(()=>{
                            ElNotification({
                                title: 'Error',
                                type: "error",
                                position: "top-right",
                                message: message,
                            })
                        },1000)


                    });
                });
            } else if (typeof errors === 'object') {
                // errors is an object
                Object.keys(errors).forEach((field, index) => {
                    errors[field].forEach((message, errorIndex) => {
                        setTimeout(()=>{
                            ElNotification({
                                title: 'Error',
                                type: "error",
                                position: "top-right",
                                message: message,
                            })
                        },1000)

                        // errorMessages.push(`${index + 1}.${errorIndex + 1}: ${message}`);
                    });
                });
            } else {
                // errors is neither an array nor an object
                ElNotification({
                    title: 'Error',
                    type: "error",
                    position: "top-right",
                    message: 'An Unexpected error occurred',
                })
            }


        } else if (err.response.data.message && err.response.data.error) {
            // QueryException, AuthenticationException, or other exceptions
            // Swal.fire({
            //     icon: 'error',
            //     title: err.response.data.message,
            //     text: err.response.data.error,
            //     timer: 4000,
            // });
            ElNotification({
                title: err.response.data.message,
                type: "error",
                position: "top-right",
                message: err.response.data.error,
            })
        }  else if (err.response.data.message ) {
            // QueryException, AuthenticationException, or other exceptions
            // Swal.fire({
            //     icon: 'error',
            //     title: err.response.data.message,
            //     text: err.response.data.message,
            //     timer: 4000,
            // });
            ElNotification({
                title: err.response.data.message,
                type: "error",
                position: "top-right",
                message: err.response.data.message,
            })
        }
        else {
            // Unexpected error format
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: 'An unexpected error occurred.',
            //     timer: 4000,
            // });
            ElNotification({
                title: 'Error',
                type: "error",
                position: "top-right",
                message: 'An Unexpected error occurred',
            })

        }
    } else {
        // Handle generic error
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: 'An error occurred. Please try again later.',
        //     timer: 4000,
        // });
        ElNotification({
            title: 'Error',
            type: "error",
            position: "top-right",
            message: err
        })

    }
}

export function deleteLocalStorageInformation(){
    localStorage.removeItem("authData")
    localStorage.removeItem("userDetails")
}






export default {}