# Delivery Robot

## Hardware
 * Rover: [http://www.tamiya.com/english/products/58587/index.htm](http://www.tamiya.com/english/products/58587/index.htm)
 * Pixhawk (Autopilot): [https://pixhawk.org/modules/pixhawk](https://pixhawk.org/modules/pixhawk)
 * Raspberry Pi 3: [https://www.raspberrypi.org/products/raspberry-pi-3-model-b/](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
 * Ultrasonic Range Finder: [https://www.sparkfun.com/products/11309](https://www.sparkfun.com/products/11309)
 * Pixy-Cam: [http://cmucam.org/projects/cmucam5/wiki/Pixy_Regular_Quick_Start](http://cmucam.org/projects/cmucam5/wiki/Pixy_Regular_Quick_Start)
 * Radio: [Turnigy TGY i6s](http://www.hobbyking.com/hobbyking/store/__97593__Turnigy_TGY_i6S_Digital_Proportional_Radio_Control_System_Mode_1_Black_.html)

## Software

### PC

 * TightVNC Client: [http://www.tightvnc.com/download.php](http://www.tightvnc.com/download.php)
 * Putty: [http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
 * Mission Planner: [http://ardupilot.org/planner/docs/common-install-mission-planner.html](http://ardupilot.org/planner/docs/common-install-mission-planner.html)

### Raspberry Pi

 * OS: ubuntu-mate-16.04-desktop-armhf-raspberry-pi.img
 * ArduPilot (ArduRover, Firmware of Pixhawk): http://ardupilot.org/rover/index.html
   * https://github.com/ArduPilot/ardupilot
 * MAVLink (native protocol of Pixhawk): 
   * http://qgroundcontrol.org/mavlink/start
   * https://pixhawk.ethz.ch/mavlink/
   * https://github.com/mavlink/mavlink
 * MAVProxy (Connects Raspberry Pi to Pixhawk, autostarted): http://ardupilot.github.io/MAVProxy/html/index.html
 * Dronekit (Simple Python API to control the rover): http://python.dronekit.io/
 * ROS (robot operating system): http://www.ros.org/  to start:
   * `source /opt/ros/kinetic/setup.bash`
   * `roscore &`
   * `roslaunch mavros px4.launch`
 * MAVROS (connects ROS to Pixhawk): http://wiki.ros.org/mavros

