'use client';
import { PropsWithChildren, useMemo } from 'react';
import { useAuthCheck } from '@/services/auth/authCheckContext';
import { type Store, accessContext } from './accessContext';
import { RoleAccessFormIDs } from '@/utils/roleAccessFormIDs';

export default function AccessProvider({
 formTitle,
 children,
}: {
 formTitle: keyof typeof RoleAccessFormIDs;
} & PropsWithChildren) {
 const { userInfo } = useAuthCheck();

 console.log(userInfo);
 const formID = RoleAccessFormIDs[formTitle as keyof typeof RoleAccessFormIDs];
 const access = useMemo(() => {
  return userInfo?.RoleAccesses.find((acc) => acc.formID === formID);
 }, [formID, userInfo]);

 let ctxValue: Store | null = useMemo(
  () => ({ roleAccess: access! }),
  [access]
 );
 if (!access) {
  ctxValue = {
   roleAccess: {
    formID,
    read: false,
    write: false,
    update: false,
    remove: false,
    changeState: false,
    formName: '',
    roleName: '',
    uiFormName: '',
   },
  };
 }

 return (
  <accessContext.Provider value={ctxValue}>{children}</accessContext.Provider>
 );
}
