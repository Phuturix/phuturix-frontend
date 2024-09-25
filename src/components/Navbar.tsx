const Navbar = () => {
  return (
    <div id="navbar-container" className="bg-black">
      <div id="navbar">
       <button className="btn btn-active">Default</button>
      </div>

      <div id="connect-btn">
        <radix-connect-button />
      </div>
    </div>
  );
};

export default Navbar;
