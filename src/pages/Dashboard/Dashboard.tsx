import React, { FC } from 'react';
import ChartCard from '../../components/Card/ChartCard';
import SideNavVisibilityProp from '../../components/MainNavigationView/SideNavVisibilityProp';
import Page from '../../components/Page/Page';


interface DashboardProps extends SideNavVisibilityProp { }

const Dashboard: FC<DashboardProps> = (props) => (
  <Page isMobile={props.isMobile} sideNavOpenState={props.sideNavOpenState} noSideNavigation>
    <div className='p-4 box-border min-h-full flex flex-col gap-4'>
      <section className="overflow-hidden">
        <div className="py-0 mx-auto lg:pt-0">
          <div className="flex flex-wrap">
            <div className="flex flex-nowrap items-stretch justify-items-stretch gap-4 w-full box-border">
              <div className="h-28 w-full flex flex-nowrap items-center bg-primary-100 rounded-lg gap-4 p-4">
                <img alt="gallery" className="block object-cover object-center w-16 h-16 rounded-full"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                  <div>
                    <h3 className={"font-semibold text-lg"}>New Arrivals</h3>
                    <p>Dropping soon</p>
                  </div>
              </div>
              <div className="h-28 w-full">
                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />
              </div>

              <div className="h-28 w-full flex flex-nowrap items-center bg-primary-100 rounded-lg gap-4 p-4">
                <img alt="gallery" className="block object-cover object-center w-16 h-16 rounded-full"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                <div>
                  <h3 className={"font-semibold text-lg"}>New Arrivals</h3>
                  <p>Dropping soon</p>
                </div>
              </div>
              <div className="h-28 w-full flex flex-nowrap items-center bg-primary-100 rounded-lg gap-4 p-4">
                <img alt="gallery" className="block object-cover object-center w-16 h-16 rounded-full"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                <div>
                  <h3 className={"font-semibold text-lg"}>New Arrivals</h3>
                  <p>Dropping soon</p>
                </div>
              </div>
              <div className="h-28 w-full flex flex-nowrap items-center bg-primary-100 rounded-lg gap-4 p-4">
                <img alt="gallery" className="block object-cover object-center w-16 h-16 rounded-full"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
                <div>
                  <h3 className={"font-semibold text-lg"}>New Arrivals</h3>
                  <p>Dropping soon</p>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-wrap w-1/2 box-border">
              <div className="w-1/2 p-1 md:p-2">
                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"/>
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"/>
              </div>
              <div className="w-full p-1 md:p-2">
                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"/>
              </div>
            </div>
            <div className="flex flex-wrap w-1/2 box-border">
              <div className="w-full p-1 md:p-2">
                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"/>
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"/>
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"/>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <section className="overflow-hidden text-gray-700">
        <div className="py-0 mx-auto lg:pt-0 flex flex-nowrap">
          <div className="flex flex-wrap w-112 bg-fuchsia-300">
            <ChartCard fullWidth />
          </div>
        </div>
      </section>
    </div>
  </Page>
);

export default Dashboard;
