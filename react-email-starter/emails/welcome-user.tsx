import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';
import * as React from 'react';

export default function WelcomeUser({ username }: { username: string }) {
    return <Html>
        <Head />
        <Tailwind>
            <Body>
                <Text className="text-2xl font-sans text-rose-600 font-bold ">
                    Welcome to wemake {username}!
                </Text>
            </Body>
        </Tailwind>
    </Html>
}