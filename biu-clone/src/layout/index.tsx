



const Layout = () => {


    return (
        <>
          <div className="flex h-full flex-col">
            <div className="flex min-h-0 w-full flex-1">
                {/* SideNav */}
                <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                    <div className="h-16 flex-none">
                        {/* Navbar */}
                    </div>
                    <div className="min-h-0 felx overflow-hidden">
                        {/* Outler */}
                    </div>
                </div>
            </div>
            <div className="relative z-50 h- w-full flex-none shadow-2xl">
                {/* PlayBar */}
            </div>
          </div>
          
        </>
    )
};

export default Layout