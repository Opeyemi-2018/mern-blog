import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight,  HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';


const DashSidebar = () => {
  let dispatch = useDispatch()
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup className='flex flex-col gap-1'>
        <Link to='/dashboard?tab=profile'>
          <Sidebar.Item
            active={tab === 'profile'}
            icon={HiUser}
            label={'User'}
            labelColor='dark'
            as='div'
          >
            Profile
          </Sidebar.Item>
        </Link>
        
        <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default DashSidebar