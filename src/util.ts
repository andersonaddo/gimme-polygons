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