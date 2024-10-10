const HandleApiError = (error) =>
{
    if (error.response)
    {
        console.log(error)
        const status = error.response.status;

        if (status === 404)
        {
            window.location.href = "/error?code=404";
        } else if (status === 403)
        {
            window.location.href = "/error?code=403";
        } else if (status === 500)
        {
            window.location.href = "/error?code=500";
        } else if (status === 401)
        {
            window.location.href = "/login";
        } else
        {
            window.location.href = "/error?code=default";
        }
    } else
    {
        // window.location.href = "/error?code=default";
    }
};

export default HandleApiError;
