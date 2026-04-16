function Footer() {
  return (
<footer className="bg-gray-900 text-white py-6 mt-5">
  <div className=" mx-auto text-center space-y-2">
    <h2 className="text-xl font-semibold">UrbanCare</h2>
    <p className="text-sm text-gray-400">
      Your trusted healthcare partner
    </p>
    <p className="text-sm  text-gray-400">Contact: info@urbancare.com</p>
    <p className="text-xs text-gray-500 mt-2">
      &copy; {new Date().getFullYear()} UrbanCare. All rights reserved.
    </p>
  </div>
</footer>
  );
}

export default Footer;