
export const prettyTime = (timeInMinutes: number) => {
    const minutes = timeInMinutes % 60
    const hours = ( timeInMinutes - minutes ) / 60

    return `${hours}h ${minutes}m`
}
