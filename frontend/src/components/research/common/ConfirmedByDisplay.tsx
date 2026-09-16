
export default function ConfirmedByDisplay(confirmed_by){
    console.log('ran')
    console.log(confirmed_by.confirmed_by.user.username)
    return(
        <section>
            <div> Confirmed by: {confirmed_by.confirmed_by.user.username} </div>
        </section>
    )
}