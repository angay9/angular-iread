const formatValidationErrors = (errors: Object) => {
    let messages = '';

    Object.keys(errors).forEach(key => {
        messages += `${key}: ${errors[key].join(', ')}<br>`;
    });

    return messages;
}

export { formatValidationErrors };
