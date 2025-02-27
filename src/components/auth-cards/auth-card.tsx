'use client';
import logo from '@/assets/my-bike-logo.png';
import { Button } from '@/components/ui/button';
import { contactInfo } from '@/data/contact-info';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AuthCardTitle from './auth-card-title';
import AuthCardWrapper from './auth-card-wrapper';

interface IProps {
  title: string;
  subTitle?: string;
  backButtonLabel: string;
  backButtonHref: string;
  children: ReactNode;
}

const AuthCard = ({
  title,
  subTitle,
  backButtonLabel,
  backButtonHref,
  children,
}: IProps) => {
  return (
    <AuthCardWrapper>
      <div className="flex justify-center mb-5">
        <img width={150} src={logo} alt={contactInfo?.name} />
      </div>
      <AuthCardTitle>{title}</AuthCardTitle>
      {subTitle && <AuthCardTitle isSubtitle>{subTitle}</AuthCardTitle>}

      {/* Card content */}
      <div className="py-2">{children}</div>

      {/* Card bottom content */}
      <div className="">
        <Button asChild variant={'link'}>
          <Link to={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </div>
    </AuthCardWrapper>
  );
};

export default AuthCard;
