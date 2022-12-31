import { createStyles, Header, Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import Nav from './nav';

const useStyles = createStyles((theme) => ({
    header: {
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      borderBottom: 0,
    },
  
    inner: {
      height: 56,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.white,
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        ),
      },
    },
  
    linkLabel: {
      marginRight: 5,
    },
  }));

export default function HeaderComponent () {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();

    return <Header height={56} className={classes.header} mb={120}>
    <Container>
      <div className={classes.inner}>
        <Group spacing={5} className={classes.links}>
          <Nav />
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
          color="#fff"
        />
      </div>
    </Container>
  </Header>
}

