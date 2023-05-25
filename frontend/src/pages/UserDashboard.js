import {CartIcon, CasesIcon, CategoryIcon, PageContainer, ProductIcon, ProductOrderIcon} from "../components/Utils";
import DashboardNavigation, {DashboardLink} from "../components/DashboardNavigation";
import {ADMIN_ROLE, userContext, VisibleToRoles} from "../providers/UserContextProvider";
import {useContext} from "react";


const UserDashboard = () => {
    const {hasRole} = useContext(userContext)

    return (
        <PageContainer>
            <DashboardNavigation>
                <DashboardLink to={"/productOrder"} caption={"Your Product orders"} icon={<ProductOrderIcon/>}/>
                {
                    !hasRole(ADMIN_ROLE) &&
                    <DashboardLink to={"/cart"} caption={"Cart"} icon={<CartIcon/>}/>
                }
                <VisibleToRoles roles={[ADMIN_ROLE]}>
                    <DashboardLink to={"/category"} caption={"Categories"} icon={<CategoryIcon/>}/>
                    <DashboardLink to={"/productOrder"} caption={"All Product Orders"} icon={<CasesIcon/>}/>
                    <DashboardLink to={"/products"} caption={"Product Catalog"} icon={<ProductIcon/>}/>
                </VisibleToRoles>
            </DashboardNavigation>
        </PageContainer>
    )
}


export default UserDashboard