import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Image,
    Button,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Link as ChakraLink
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import MenuItems from './NavbarItems.json';
import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href: string;
}

const NAV_ITEMS: Array<NavItem> = MenuItems.Menu;

const WithSubnavigation = () => {
    const { isOpen, onToggle } = useDisclosure();
    const { userStore: {isLoggedIn, user, logout } } = useStore();

    return (
        <Box style={{ position: 'sticky', top: '0', zIndex: '1' }}>
            <Flex bg={useColorModeValue('pink', 'gray.800')} color={useColorModeValue('gray.600', 'white')} minH={'60px'} py={{ base: 2 }} px={{ base: 4 }} borderBottom={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.900')} align={'center'}>
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle} icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Text
                        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                        fontFamily={'heading'}
                        color={useColorModeValue('gray.800', 'white')}>
                        <Image alt='logo' boxSize='30px' src='/assets/logo.png' />
                    </Text>
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Flex hidden={!isLoggedIn} flex={{ base: 1 }} justify={{ base: 'center', md: 'end' }}>
                    <Menu>
                        <MenuButton px={4}
                            as={Button}
                            borderRadius='md'
                            borderWidth='2px'
                            borderColor='black'
                            color='black'
                            bg='red.400'
                            _hover={{ bg: 'gray.300' }}
                            leftIcon={user?.image ? (<Avatar size='xs' bg='red.400' src={user.image} />)
                            :
                            (<Avatar size='xs' bg='red.400' icon={<AiOutlineUser fontSize='2rem' />} />)
                        }
                            rightIcon={<ChevronDownIcon />}
                            >
                            {user?.displayName}
                        </MenuButton>
                        <MenuList >
                            <MenuItem as={Link} color='black' to={`/profiles/${user?.username}`}
                                icon={<AiOutlineUser />} >My Profile</MenuItem>
                                <MenuDivider />
                            <MenuItem color='black' as={Button} bg='red.400' onClick={logout} icon={<BiLogOut />} >Logout</MenuItem>
                        </MenuList>
                    </Menu>


                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
};

const DesktopNav = () => {
    const linkColor = useColorModeValue('black', 'gray.200');
    //const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem, i) => (
                <Box key={i}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            {navItem.label.match('Create activity') ?
                                <Button
                                    p={2}
                                    borderWidth='2px'
                                    borderColor='black'
                                    _hover={{ bg: 'gray.300' }}
                                    as={NavLink}
                                    to={navItem.href}
                                    fontSize={'md'}
                                    fontWeight={500}
                                    color={linkColor}
                                    colorScheme='black'
                                    variant='soild'
                                    bg='red.400'>
                                    {navItem.label}
                                </Button> : <Button
                                    p={2}
                                    borderWidth='2px'
                                    _hover={{ bg: 'gray.300' }}
                                    as={NavLink}
                                    to={navItem.href}
                                    fontSize={'md'}
                                    fontWeight={500}
                                    color={linkColor}
                                    colorScheme='black'
                                    variant='outline'>
                                    {navItem.label}
                                </Button>}
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <ChakraLink
            href={href}
            role={'listitem'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('lightpink', 'gray.900') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400' }}
                        fontWeight={500}
                        style={{ color: 'black' }}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </ChakraLink>
    );
};

const MobileNav = () => {
    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            p={4}
            display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={ChakraLink}
                href={href}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text
                    fontWeight={600}
                    color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <ChakraLink key={child.label} py={2} href={child.href}>
                                {child.label}
                            </ChakraLink>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

export default observer(WithSubnavigation);