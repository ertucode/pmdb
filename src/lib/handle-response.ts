
export const handleResponse = <T>(res: Response | undefined) => {
    return res?.ok ? res.json() as T : undefined
}
