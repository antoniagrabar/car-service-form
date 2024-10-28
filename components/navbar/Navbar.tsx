const Navbar = () => {
  return (
    <nav className="bg-primary-100 xs:px-[50px] sticky top-0 w-full p-[15px]">
      <div className="flex items-center justify-between">
        <h2 className="h2-bold text-base-600">Konfigurator servisa</h2>
        <p className="paragraph-regular text-white text-right">
          Izračunajte trošak servisa
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
