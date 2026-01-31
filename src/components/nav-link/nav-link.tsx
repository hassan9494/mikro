import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

type NavLinkProps = {
    router: any;
    href: string;
    label: string;
    intlId?: string;
    icon?: React.ReactNode;
    className?: string;
    iconClass?: string;
    target?: string;
    dynamic?: boolean;
    onClick?: () => void;
};

const Icon = styled.span`
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink: React.SFCFactory<NavLinkProps> = ({
  href,
  label,
  intlId,
  router,
  icon,
  className,
  onClick,
  iconClass,
  target,
  dynamic,
}) => {
    const isCurrentPath = router.pathname === href || router.asPath === href;
    return (
        <div onClick={onClick} className={className ? className : ''}>
            {dynamic ? (
                <Link
                    href={'/[type]'}
                    as={href}
                    className={isCurrentPath ? ' current-page' : ''}
                    style={{ display: 'flex', alignItems: 'center' }}
                    target={target || '_self'}
                >
                    {icon ? <Icon className={iconClass}>{icon}</Icon> : ''}

                    <span className="label">
              {intlId ? (
                  <FormattedMessage
                      id={intlId ? intlId : 'defaultNavLinkId'}
                      defaultMessage={label}
                  />
              ) : (
                  label
              )}
            </span>
                </Link>
            ) : (
                <Link
                    href={href}
                    className={isCurrentPath ? ' current-page' : ''}
                    style={{ display: 'flex', alignItems: 'center' }}
                    target={target || '_self'}
                >
                    {icon ? <Icon className={iconClass}>{icon}</Icon> : ''}

                    <span className="label">
              {intlId ? (
                  <FormattedMessage
                      id={intlId ? intlId : 'defaultNavLinkId'}
                      defaultMessage={label}
                  />
              ) : (
                  label
              )}
            </span>
                </Link>
            )}
        </div>
    );
};

export default withRouter(NavLink);
