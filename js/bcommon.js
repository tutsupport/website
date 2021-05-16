$(document).ready(function()
{
    createplacesdata();
    createpersonsdata();
});


function createplacesdata()
{
    var data = 
    {
        "@context":"https://schema.org"
        ,"@graph":
        [
            {
                "@type":"PostalAddress"
                ,"@id":"http://raobán.vn/info/place-5.html"
                , "name":"CN5 - Tra Vinh" /* "<data:blog.title/>" */
                ,"streetAddress": "tỉnh Tra Vinh"
                ,"addressLocality": "Tra Vinh"
                ,"addressRegion": "Tra Vinh"
                ,"postalCode": "893400"
                ,"addressCountry": "Vietnam"
            }
            ,{
                "@type":"PostalAddress"
                ,"@id":"http://raobán.vn/info/place-1.html"
                , "name":"CN1 - Tien Giang"
                ,"streetAddress": "tỉnh TIền Giang"
                ,"addressLocality": "Tiền Giang"
                ,"addressRegion": "Tiền Giang"
                ,"postalCode": "893400"
                ,"addressCountry": "Vietnam"
            }
            ,{
                "@type":"PostalAddress"
                ,"@id":"http://raobán.vn/info/place-2.html"
                , "name":"CN2 - Vinh Long"
                ,"streetAddress": "tỉnh VL"
                ,"addressLocality": "VL"
                ,"addressRegion": "VL"
                ,"postalCode": "893400"
                ,"addressCountry": "Vietnam"
            }
            ,{
                "@type":"PostalAddress"
                ,"@id":"http://raobán.vn/info/place-3.html"
                , "name":"CN3 - Long An"
                ,"streetAddress": "tỉnh Long An"
                ,"addressLocality": "Long An"
                ,"addressRegion": "Long An"
                ,"postalCode": "893400"
                ,"addressCountry": "Vietnam"								
            }
            ,{
                "@type":"PostalAddress"
                ,"@id":"http://raobán.vn/info/place-4.html"
                , "name":"CN4 - Ca Mau"
                ,"streetAddress": "tỉnh Ca Mau"
                ,"addressLocality": "Ca Mau"
                ,"addressRegion": "Ca Mau"
                ,"postalCode": "893400"
                ,"addressCountry": "Vietnam"								
            }
            ,{
                "@type":"Place"
                ,"@id":"http://raobán.vn/info/place.html"
                ,"name":"DANH SACH DIA CHI"
                ,"address":
                [
                    {
                        "@id":"http://raobán.vn/info/place-1.html"						
                    }
                    ,{
                        "@id":"http://raobán.vn/info/place-2.html"						
                    }
                    ,{
                        "@id":"http://raobán.vn/info/place-3.html"						
                    }
                    ,{
                        "@id":"http://raobán.vn/info/place-4.html"						
                    }
                    ,{
                        "@id":"http://raobán.vn/info/place-5.html"						
                    }
                    ,{
                        "@id":"http://raobán.vn/info/place-6.html"						
                    }
                    ,{
                        "@id":"http://raobán.vn/info/place-7.html"						
                    }
                ]
            }
        ]
    };
                
    $("#bcommon-places").html(JSON.stringify(data));
}


function createpersonsdata()
{
    var data = 
    {
        "@context":"https://schema.org"
        ,"@graph":
        [
            {
                "@type":"Person"
                ,"@id":"http://raobán.vn/info/hoagiakhi.html"
                ,"name":"Hoa Gia Khi"
                ,"url":["http://raobán.vn/info/hoagiakhi.html"]
                ,"image":
                {
                    "@type":"ImageObject"
                    ,"@id":"http://raobán.vn/info/hoagiakhi-avatar.html"
                    ,"url":"http://raobán.vn/info/hoagiakhi-avatar.html"
                    ,"caption":""
                    ,"inLanguage":"vi"
                }
                ,"contactPoint":
                [
                    {
                    "@type":"ContactPoint"
                    ,"telephone":"+84-84-84-82-900"
                    /*
                    ,"contactType":"customer service"
                    ,"areaServed":"VN"
                    ,"availableLanguage":["EN","VN"]
                    */
                    }
                ]
                ,"sameAs":
                [
                    "https://www.facebook.com/hoagiakhi"
                    ,"https://twitter.com/hoagiakhi"
                ]
                /*
                ,"worksFor":
                {
                    "@id":"http://raobán.vn/info/organization.html"
                }
                */
            }
            ,{
                "@type":"Person"
                ,"@id":"http://raobán.vn/info/hoa_gia_khi.html"
                ,"name":"Hoa Gia Khi"
                ,"url":["http://raobán.vn/info/hoa_gia_khi.html"]
                ,"image":
                {
                    "@type":"ImageObject"
                    ,"@id":"http://raobán.vn/info/hoa_gia_khi-avatar.html"
                    ,"url":"http://raobán.vn/info/hoa_gia_khi-avatar.html"
                    ,"caption":""
                    ,"inLanguage":"vi"
                }
                ,"contactPoint":
                [
                    {
                    "@type":"ContactPoint"
                    ,"telephone":"+84-84-84-82-900"
                    /*
                    ,"contactType":"customer service"
                    ,"areaServed":"VN"
                    ,"availableLanguage":["EN","VN"]
                    */
                    }
                ]
                ,"sameAs":
                [
                    "https://www.facebook.com/hoa_gia_khi"
                    ,"https://twitter.com/hoa_gia_khi"
                ]
                /*
                ,"worksFor":
                {
                    "@id":"http://raobán.vn/info/organization.html"
                }
                */
            }
        ]
    };
                
    $("#bcommon-persons").html(JSON.stringify(data));
}
