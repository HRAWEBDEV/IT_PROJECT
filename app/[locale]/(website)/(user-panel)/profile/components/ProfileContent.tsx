'use client';
import { useAppMonitorConfig } from '@/services/app-monitor/appMonitor';
import ProfileMenu from './ProfileMenu';
function ProfileContent() {
 const { isLargeDevice } = useAppMonitorConfig();
 return <>{!isLargeDevice && <ProfileMenu />}</>;
}

export default ProfileContent;
