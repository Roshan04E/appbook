
import {getAllUsers} from '@/lib/database/users/actions'


const test = async () => {
  const res = await getAllUsers();
  console.log(res);
  
  
  return (<div className="flex items-center justify-center pt-40 font-bold text-3xl text-white">Test Page</div>)
}

export default test