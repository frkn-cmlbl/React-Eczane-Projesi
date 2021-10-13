import React, { useEffect, useState } from "react";
import { Card, Container, Dropdown, Grid, GridColumn } from "semantic-ui-react";
import { getCity, getCounty, getPharmacy } from "./Services";

interface IIl {
    SehirAd: string;
    SehirSlug: string;
  }
  interface IIlce {
    ilceAd: string;
    ilceSlug: string;
  }
  
  export interface IDetail {
    EczaneAdi: string;
    Adresi: string;
    Semt: string;
    YolTarifi: string;
    Telefon: string;
    Telefon2: string;
    Sehir: string;
    ilce: string;
    latitude: number;
    longitude: number;
  }
  


export default function Home() {
const [city, setCity] = useState<IIl[]>([])
const [county, setCounty] = useState<IIlce[]>([])
const [sehirSlag, setSehirSlag] = useState("")
const [pharmacy, setPharmacy] = useState<IDetail[]>([])


useEffect(() => {
  getingAllCity();
}, [])

function getingAllCity(){
    getCity().then(res=>{
        const arrIl:IIl[]=[]
        res.data.data.map((item:IIl)=>{
       
          return arrIl.push(item)
        })
        setCity(arrIl)
    })
}
function selecetedCity(selectedCityDropDown:string){
    city.map((item)=>{
        if (item.SehirAd===selectedCityDropDown) {
            setSehirSlag(item.SehirSlug)
            getCounty(item.SehirSlug).then(res=>{
                const arrCounty:IIlce[]=[]
                res.data.data.map((item:IIlce)=>{
                    return arrCounty.push(item)
                })
                setCounty(arrCounty)
                console.log('ilçe', res);
            })
            
            console.log(`slug`, item.SehirSlug)
        }
    })
}

function selectedCounty(selectedCountyDropDown:string){
    county.map((item)=>{
        if (item.ilceAd===selectedCountyDropDown) {
            console.log(item.ilceSlug);
            getPharmacy(sehirSlag,item.ilceSlug).then(res=>{
                console.log(res);
                const arrPhar:IDetail[]=[]

                res.data.data.map((item:IDetail)=>{
                    return arrPhar.push(item)
                })
                setPharmacy(arrPhar)
            })
        }
    })

}


  const countryOptions = city.map((item,index)=>({
      key:index,
      text:item.SehirAd,
      value:item.SehirSlug
  }));
  const countyOptions=county.map((item,index)=>({
      key:index,
      text:item.ilceAd,
      value:item.ilceSlug
  }))

  return (
    <>
      <Container>
        <Grid columns="2">
          <GridColumn>
            <Dropdown 
            onChange={(evt)=>{selecetedCity(String(evt.currentTarget.children[0].textContent))}}
              placeholder="Select Country"
              fluid
              search
              selection
              options={countryOptions}
            />
          </GridColumn>
          <GridColumn>
            <Dropdown
                onChange={(evt)=>{selectedCounty(String(evt.currentTarget.children[0].textContent))}}
              placeholder="Select Country"
              fluid
              search
              selection
              options={countyOptions}
            />
          </GridColumn>
        </Grid>
        <Grid columns="4">
            {
                pharmacy && 
                pharmacy.map((item,index)=>{
                    return (
                        <GridColumn key={index}>
                        <Card>
                        <Card.Content header={item.EczaneAdi} />
                        <Card.Content description={item.Adresi} />
                        <Card.Content extra>
                         {item.Telefon}
                        </Card.Content>
                      </Card>
                      </GridColumn>
                    )
                })
            }
        </Grid>
      </Container>
    </>
  );
}
