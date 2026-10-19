const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export function formatCurrency(amount: number): string {
    return currencyFormatter.format(amount);
}

export function toTitleCase(text: string): string {
    return text
        .split(' ')
        .map(word => (word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ''))
        .join(' ');
}
