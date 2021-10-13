import axios from "axios";
const apiToken="Pp4xCoBXFePcujQZqbhrKRIZntLxLTRZyIEMTteFEHcfzfyYcpgBIxPYwvxH"
const service=axios.create({
    baseURL:"/apiv2/pharmacy/",
    timeout:15000,
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+ apiToken,
      }
})

export function getPharmacy(city:string,county:string){
    const prm={
        city,
        county
    }
    return service.get("list",{params:prm})
}   
export function getCounty(city:string){
    const prm={
        city,
        
    }
    return service.get("city",{params:prm})
} 

export function getCity(){
    return service.get("city")
}