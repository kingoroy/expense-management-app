import { useEffect, useState } from 'react';
import * as Device from 'expo-device';

const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      try {
        if (Device.isDevice) {
          const id = Device.osBuildId || Device.osInternalBuildId || 'Unknown';
          setDeviceId(id);
        } else {
          setDeviceId('Simulator');
        }
      } catch (error) {
        console.error('Error fetching device ID:', error);
        setDeviceId('Error');
      }
    };

    fetchDeviceId();
  }, []);

  return deviceId;
};

export default useDeviceId;
