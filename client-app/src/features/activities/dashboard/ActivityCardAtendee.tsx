import { Avatar, AvatarGroup, Popover, PopoverTrigger } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { Profile } from '../../../app/models/profile';
import ProfileCardPopover from '../../profiles/ProfileCardPopover';

interface Props {
    attendees: Profile[];
}

const ActivityCardAtendee = ({ attendees }: Props) => {
    return (
        <AvatarGroup max={8} size='sm' p={1}>
            {attendees.map(attendee => {
                return <Popover key={attendee.username} trigger='hover' placement='top'>
                    <PopoverTrigger>
                        <Avatar as={Link} to={`/profiles/${attendee.username}`} size='xs' border={attendee.following ? '2px solid orange' : ''}
                            src={attendee.image} bg={'red.400'} icon={<AiOutlineUser fontSize='5rem' />}
                        />
                    </PopoverTrigger>
                        <ProfileCardPopover profile={attendee} />
                </Popover>;
            })}
        </AvatarGroup >
    );
};

export default observer(ActivityCardAtendee);