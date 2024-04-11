import { Avatar } from "@nextui-org/react";

export default function CountryAvatar({ activeCountry } : { activeCountry: String }){
    return (
        <Avatar 
            isBordered
            src={"https://flagsapi.com/" + activeCountry + "/flat/64.png"}
            color='default'
            size="lg"
            imgProps={{
                style: {
                width: 90,
                height: 90,
                }
            }}
        />
    )
}