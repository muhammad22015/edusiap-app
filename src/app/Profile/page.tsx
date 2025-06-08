"use client"
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';
import { getUserIdFromToken } from '@/lib/auth';

interface UserData {
  username?: string;
  fullname: string;
  email?: string;
  phone: string;
  avatar?: string;
  joinedDate?: string;
  user_id?: number;
}

const availableAvatars = [
  'https://avatar.iran.liara.run/public/31',
  'https://avatar.iran.liara.run/public/14',
  'https://avatar.iran.liara.run/public/47',
  'https://avatar.iran.liara.run/public/17',
  'https://avatar.iran.liara.run/public/11',
  'https://avatar.iran.liara.run/public/12',
  'https://avatar.iran.liara.run/public/18',
  'https://avatar.iran.liara.run/public/50',
  'https://avatar.iran.liara.run/public/55',
  'https://avatar.iran.liara.run/public/71',
  'https://avatar.iran.liara.run/public/66',
  'https://avatar.iran.liara.run/public/64',
  'https://avatar.iran.liara.run/public/59',
  'https://avatar.iran.liara.run/public/60',
  'https://avatar.iran.liara.run/public/80',
  'https://avatar.iran.liara.run/public/77',
];

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');
  const [userData, setUserData] = useState<UserData>({
    fullname: '',
    phone: '',
    email: '',
    username: '',
    avatar: 'https://avatar.iran.liara.run/public/31',
    joinedDate: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const userId = getUserIdFromToken();
        
        if (!userId) {
          throw new Error('User not authenticated');
        }

        // Use apiClient which handles authentication
        const data = await apiClient(`/user-profile/?id=${userId}`);
        
        if (data.status === "Authorized" && data.response) {
          setUserData({
            fullname: data.response.fullname || '',
            phone: data.response.phone || '',
            user_id: data.response.user_id,
            email: data.response.user?.email || '',
            username: data.response.user?.username || '',
            avatar: data.response.avatar || 'https://avatar.iran.liara.run/public/31',
            joinedDate: data.response.user?.created_at 
              ? new Date(data.response.user.created_at).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })
              : 'Unknown date'
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
        if (err.message.includes('Session expired') || err.message.includes('not authenticated')) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  const handleSave = async (updatedData: UserData) => {
    try {
      setIsLoading(true);
      const userId = getUserIdFromToken();
      
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const result = await apiClient(`/user-profile/update?id=${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
          fullname: updatedData.fullname,
          phone: updatedData.phone,
          avatar: updatedData.avatar
        })
      });

      if (result.status === "Update Berhasil") {
        // Option 1: Full page reload
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      console.error('Error updating profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-orange-100">
        <Sidebar />
        <main className="flex-1 py-0 max-md:px-5 max-md:py-0 ml-[120px]">
          <Header />
          <div className="p-6 max-w-6xl mx-auto mt-30 flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-orange-100">
        <Sidebar />
        <main className="flex-1 py-0 max-md:px-5 max-md:py-0 ml-[120px]">
          <Header />
          <div className="p-6 max-w-6xl mx-auto mt-30 bg-white rounded-xl shadow-md">
            <div className="text-red-500 text-center">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 py-0 max-md:px-5 max-md:py-0 ml-[120px] max-sm:ml-0 max-sm:px-3">
        <Header />
        
        <div className="p-6 max-w-6xl mx-auto mt-30 max-sm:mt-25">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-8 max-sm:mb-4">
            <h1 className="text-3xl font-bold text-gray-800 max-sm:text-lg max-sm:hidden">My Profile</h1>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('view')}
                className={`px-4 py-2 rounded-lg max-sm:text-sm max-sm:px-2 max-sm:py-1 ${activeTab === 'view' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}
              >
                Lihat Profile
              </button>
              <button 
                onClick={() => setActiveTab('edit')}
                className={`px-4 py-2 rounded-lg max-sm:text-sm max-sm:px-2 max-sm:py-1 ${activeTab === 'edit' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {activeTab === 'view' ? (
              <ProfileView userData={userData} />
            ) : (
              <ProfileEdit 
                userData={userData} 
                onSave={handleSave} 
                onCancel={() => setActiveTab('view')} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Profile View Component
function ProfileView({ userData }: { userData: UserData }) {
  const avatarUrl = userData.avatar || 'https://avatar.iran.liara.run/public/31';
  return (
    <div className="p-8 max-sm:p-4">
      <div className="flex flex-col md:flex-row gap-8 max-sm:gap-4">
        {/* Left Column - Avatar */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-orange-200 max-sm:w-25 max-sm:h-25">
            {avatarUrl && (
              <img 
                src={avatarUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 max-sm:text-xl">{userData.fullname}</h2>
          <p className="text-gray-500 text-center max-sm:text-md">@{userData.username}</p>
          <p className="text-gray-500 text-center text-sm mt-2">Member since {userData.joinedDate}</p>
        </div>

        {/* Right Column - Details */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 max-sm:text-xl">Informasi Pribadi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-sm:text-md">
              <div className='w-full flex flex-col'>
                <p className="text-gray-600 text-sm">Username</p>
                <p className="text-gray-800 font-medium break-words">@{userData.username}</p>
              </div>
              <div className='w-full flex flex-col'>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-800 font-medium break-words">{userData.email}</p>
              </div>
              <div className='w-full flex flex-col'>
                <p className="text-gray-600 text-sm">Nama Lengkap</p>
                <p className="text-gray-800 font-medium break-words">{userData.fullname || 'Not set'}</p>
              </div>
              <div className='w-full flex flex-col'>
                <p className="text-gray-600 text-sm">Nomor Handphone</p>
                <p className="text-gray-800 font-medium break-words">{userData.phone || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Settings</h3>
            <button className="text-orange-600 hover:underline mr-4">Change Password</button>
            <button className="text-orange-600 hover:underline">Privacy Settings</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

// Profile Edit Component (unchanged)
function ProfileEdit({ userData, onSave, onCancel }: { 
  userData: UserData, 
  onSave: (data: UserData) => void, 
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState<UserData>({
    ...userData,
    avatar: userData.avatar || 'https://avatar.iran.liara.run/public/31'
  });
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setFormData({ ...formData, avatar: avatarUrl });
    setShowAvatarPicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      fullname: formData.fullname,
      phone: formData.phone
    });
  };

  return (
    <div className="p-8 max-sm:p-4">
      <form onSubmit={handleSubmit} className="space-y-6 max-sm:p-0">
        <div className="flex flex-col md:flex-row gap-8 max-sm:gap-4">
          {/* Left Column - Avatar */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-orange-200 relative group max-sm:w-25 max-sm:h-25">
            <img 
              src={formData.avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              className="absolute inset-0 w-full h-full bg-black/70 bg-opacity-0 text-white opacity-0 
                        group-hover:bg-opacity-50 group-hover:opacity-100 transition-all duration-200
                        flex items-center justify-center"
            >
              <span className="bg-black px-3 py-1 rounded-full text-sm">
                Change Avatar
              </span>
            </button>
          </div>
            
            {showAvatarPicker && (
              <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 max-sm:w-2/3 max-sm:m-auto">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-sm:border-1 max-sm:border-black">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg text-orange-500 font-bold max-sm:text-md">Choose Your Avatar</h3>
                    <button 
                      onClick={() => setShowAvatarPicker(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-4 max-sm:grid-cols-3">
                    {availableAvatars.map((avatar) => (
                      <div 
                        key={avatar}
                        onClick={() => handleAvatarSelect(avatar)}
                        className={`cursor-pointer p-1 rounded-full transition-all ${
                          formData.avatar === avatar 
                            ? 'ring-2 ring-orange-500 transform scale-105' 
                            : 'hover:ring-1 hover:ring-gray-300'
                        }`}
                      >
                        <img 
                          src={avatar} 
                          alt="Avatar option" 
                          className="w-full h-auto rounded-full aspect-square object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Form Fields (unchanged) */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1 max-sm:text-md">Nama Lengkap</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg text-black max-sm:text-sm max-sm:p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 max-sm:text-md">Nomor Handphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg text-black max-sm:text-sm max-sm:p-2"
                  pattern="^0\d{9,12}$"
                  title="Nomor Handphone Harus berawal 0 dan berjumlah 10-13 digit"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-black rounded-lg max-sm:text-sm max-sm:px3 max-sm:py-1 text-black hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg max-sm:text-sm max-sm:px3 max-sm:py-1 hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}