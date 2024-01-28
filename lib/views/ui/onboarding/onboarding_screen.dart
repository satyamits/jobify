import 'package:flutter/material.dart';
import 'package:jobify/views/common/exports.dart';

class OnBoardingScreen extends StatelessWidget {
  const OnBoardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          PageView(
            children: const [
              PageOne(),
              PageTwo(),
              PageThree(),
            ],
          )
        ],
      ),
    );
  }
}
