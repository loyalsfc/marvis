export interface PropertyImagePreview{
    url: string;
    isMarkedFeatured: boolean;
}

export interface FeaturesProp{
    id: string
    title: string;
    value: string;
}

export interface PropertyOnwerProp{
    profile_picture: string,
    first_name: string,
    last_name: string,
    email: string,
    mobile_number: string,
    office_number: string,
    fax_number: string,
    biological_information: string,
    address: string,
}

export type SelectedTab = "Basic" | "Gallery" | "Features" | "Owner"

export interface PropertyDetailProp{
    property_title: string,
    property_address: string,
    rent_price: string,
    property_type: string,
    property_location: string,
    bedroom: string,
    bath: string,
    year_built: string,
    units: string,
    video_url: string,
    property_label: string,
    property_label_color: string,
    property_description: string
}

export interface PropertyUnitProps{
    unit: string,
    isAvailable: string,
    rent_date: string,
    rent_duration: string,
    expiry_date: string,
    tenant: string
}

export interface OwnerProp{
    id:number;
    created_at:string;
    first_name:string;
    last_name:string;
    email:string;
    mobile_number:string;
    fax_number:string;
    office_number:string;
    biological_information:string;
    address:string;
    profile_picture:string;
    agent_id:string;
}

export interface PropertyProps {
    id:string;
    created_at:string;
    property_title:string;
    property_address:string;
    rent_price:string;
    property_type:string;
    property_location:string;
    bedroom:string;
    bath:string;
    year_built:string;
    units:number;
    video_url:string;
    additional_details: FeaturesProp[],
    features: string[] | null,
    property_label: string,
    label_color: string | null,
    property_owner: OwnerProp,
    property_image: {
        url: string,
        isMarkedFeatured: boolean
      }[],
    vacant_units: number,
    property_units: {
        unit: number,
        tenant: string,
        rent_date: string,
        expiry_date: string,
        isAvailable: boolean,
        rent_duration: string
      }[]
    agent_id: string;
    slug: string;
    property_description: string;
    agents_table?: {
        id: number,
        created_at: string,
        full_name: string,
        agency_name: string,
        agent_id: string,
        phone_number: string,
        email: string,
        home_address: string,
        office_address: string,
        profile_image: string
      }
}

export interface PropertyUnits{
    unit: number,
    tenant: string,
    rent_date: string,
    expiry_date: string,
    isAvailable: boolean,
    rent_duration: string
}

export interface PropertyFilter{
    location: string;
    type: string;
    beds: string;
    priceRange: string;
}

export interface AgentDetails{
    id: number;
    created_at: string;
    full_name: string;
    agency_name: string;
    agent_id: string;
    phone_number: string;
    email: string;
    home_address: string;
    office_address: string;
    profile_image: string;
}