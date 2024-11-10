// https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
export const camelCaseToTitleCase = (str: string) => {
    return str.replace(
        /(^[a-z]+)|[0-9]+|[A-Z][a-z]+|[A-Z]+(?=[A-Z][a-z]|[0-9])/g,
        function (match, first) {
            if (first) match = match[0].toUpperCase() + match.substr(1);
            return match + ' ';
        }
    )
}

export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}-${hours}${minutes}${seconds}`;
}
